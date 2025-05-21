import { parseArgs } from "util";
import { getLegislatureData } from "./downloader";
import type { Legislature } from "./legislature";

async function main() {
  // Parse command line arguments
  const { values } = parseArgs({
    args: Bun.argv,
    options: {
      update: {
        short: 'u',
        type: 'boolean',
        default: false,
      },
      verbose: {
        short: 'v',
        type: 'boolean',
        default: false,
      }
    },
    strict: false,
    allowPositionals: true,
  });

  // Get the legislature data, forcing update if flag is passed
  const forceUpdate: boolean = values.update as boolean;
  const verbose: boolean = values.verbose as boolean;
  const legislatureData = await getLegislatureData(forceUpdate);
  
  displayInitiatives(legislatureData, verbose);
}

function displayInitiatives(events: Legislature[], verbose: boolean = false) {
  const initiatives = events || [];
  
  console.log("\n=== PARLIAMENTARY INITIATIVES ===\n");
  
  if (initiatives.length === 0) {
    console.log("No initiatives found.");
    return;
  }
  
  initiatives.forEach((initiative, index) => {
    // Always display title and ID
    console.log(`\x1b[1;34m[${index + 1}] ${initiative.IniTitulo || initiative.IniEpigrafe || 'No Title'}\x1b[0m`);
    
    // Only show type in verbose mode
    if (verbose && initiative.IniDescTipo) {
      console.log(`\x1b[1;33mType:\x1b[0m ${initiative.IniDescTipo}`);
    }
    
    // Always show date
    console.log(`\x1b[1;33mDate:\x1b[0m ${initiative.DataInicioleg || 'N/A'}`);
    
    // Always display authors information
    if (initiative.IniAutorGruposParlamentares && initiative.IniAutorGruposParlamentares.length > 0) {
      console.log(`\x1b[1;33mAuthors:\x1b[0m`);
      initiative.IniAutorGruposParlamentares.forEach(author => {
        console.log(`  - ${author.GP}`);
      });
    }
    
    // Check for voting information in events
    if (initiative.IniEventos && initiative.IniEventos.length > 0) {
      // Display phase information only in verbose mode
      initiative.IniEventos.forEach(event => {
        if (verbose && event.Fase && event.DataFase) {
          console.log(`\x1b[1;33mPhase:\x1b[0m ${event.Fase} (${event.DataFase})`);
        }
        
        // Always display voting information
        if (event.Votacao && event.Votacao.length > 0) {
          console.log(`\x1b[1;33mVoting:\x1b[0m`);
          event.Votacao.forEach(vote => {
            console.log(`  - Date: ${vote.data || 'N/A'}`);
            console.log(`    Result: ${vote.resultado || 'N/A'}`);
            
            if (vote.detalhe) {
              displayVoteDetails(vote.detalhe, "    ");
            }
            
            // Show absences if available
            if (vote.ausencias && vote.ausencias.length > 0) {
              console.log(`    Absences: ${vote.ausencias.join(', ')}`);
            }
          });
        }
        
        // Only display committee information in verbose mode
        if (verbose && event.Comissao && event.Comissao.length > 0) {
          event.Comissao.forEach(committee => {
            if (committee.Nome) {
              console.log(`\x1b[1;33mCommittee:\x1b[0m ${committee.Nome} (${committee.Sigla || 'N/A'})`);
            }
            
            // Display committee voting information
            if (committee.Votacao && committee.Votacao.length > 0) {
              console.log(`  \x1b[1;33mCommittee Voting:\x1b[0m`);
              committee.Votacao.forEach(vote => {
                console.log(`    - Date: ${vote.data || 'N/A'}`);
                console.log(`      Result: ${vote.resultado || 'N/A'}`);
                
                if (vote.detalhe) {
                  displayVoteDetails(vote.detalhe, "      ");
                }
              });
            }
          });
        }
        
        // Only display publication information in verbose mode
        if (verbose && event.PublicacaoFase && event.PublicacaoFase.length > 0) {
          console.log(`\x1b[1;33mPublications:\x1b[0m`);
          event.PublicacaoFase.forEach(pub => {
            console.log(`  - Date: ${pub.pubdt || 'N/A'}`);
            console.log(`    Type: ${pub.pubTipo || 'N/A'}`);
            if (pub.obs) console.log(`    Note: ${pub.obs}`);
            if (pub.URLDiario) console.log(`    URL: ${pub.URLDiario}`);
          });
        }
      });
    }
    
    // Only display attachments in verbose mode
    if (verbose && initiative.IniAnexos && initiative.IniAnexos.length > 0) {
      console.log(`\x1b[1;33mAttachments:\x1b[0m`);
      initiative.IniAnexos.slice(0, 3).forEach(anexo => { // Show only first 3 attachments
        console.log(`  - ${anexo.anexoNome || 'Unnamed attachment'}`);
        console.log(`    URL: ${anexo.anexoFich || 'N/A'}`);
      });
      
      if (initiative.IniAnexos.length > 3) {
        console.log(`  ...and ${initiative.IniAnexos.length - 3} more attachments`);
      }
    }
    
    // Add separator between initiatives
    console.log("\n" + "=".repeat(50) + "\n");
  });
  
  console.log(`Total initiatives: ${initiatives.length}`);
}

/**
 * Parses and displays voting details in a nicely formatted way
 * @param voteDetails The voting details string to parse
 * @param indent The indentation to add before each line
 */
function displayVoteDetails(voteDetails: string, indent: string = "    ") {
  // First, clean the HTML tags
  const cleanDetail = voteDetails.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  
  // Parse different vote sections
  const sections: { [key: string]: string[] } = {};
  
  // Look for common voting patterns with improved regex that handles HTML tags
  const patterns = [
    { label: "A Favor", regex: /A Favor:(.*?)(?=(?:Contra:|Abstenção:|Ausência:|$))/is },
    { label: "Contra", regex: /Contra:(.*?)(?=(?:A Favor:|Abstenção:|Ausência:|$))/is },
    { label: "Abstenção", regex: /Abstenção:(.*?)(?=(?:A Favor:|Contra:|Ausência:|$))/is },
    { label: "Ausência", regex: /Ausência:(.*?)(?=(?:A Favor:|Contra:|Abstenção:|$))/is }
  ];
  
  patterns.forEach(pattern => {
    const match = voteDetails.match(pattern.regex);
    if (match && match[1]) {
      // Extract party names from the HTML tags
      const partyRegex = /<I>\s*([^<]+)\s*<\/I>/ig;
      const parties: string[] = [];
      let partyMatch;
      
      while ((partyMatch = partyRegex.exec(match[1])) !== null) {
        if (partyMatch[1] && partyMatch[1].trim()) {
          parties.push(partyMatch[1].trim());
        }
      }
      
      if (parties.length > 0) {
        sections[pattern.label] = parties;
      }
    }
  });
  
  // If no patterns matched, just show the original text
  if (Object.keys(sections).length === 0) {
    console.log(`${indent}${cleanDetail}`);
    return;
  }
  
  // Display the sections with color coding
  const colorMap: { [key: string]: string } = {
    "A Favor": "\x1b[1;32m", // Green
    "Contra": "\x1b[1;31m", // Red
    "Abstenção": "\x1b[1;33m", // Yellow
    "Ausência": "\x1b[1;90m" // Gray
  };
  
  Object.entries(sections).forEach(([label, parties]) => {
    const color = colorMap[label] || "";
    const resetColor = "\x1b[0m";
    console.log(`${indent}${color}${label}:${resetColor} ${parties.join(', ')}`);
  });
}

// Run the main function
main().catch(error => {
  console.error("Application error:", error);
  process.exit(1);
});

