import { existsSync, writeFileSync } from "fs";
import { join } from "path";
import type { Legislature } from "./legislature";

// Configuration
const JSON_URL = "https://app.parlamento.pt/webutils/docs/doc.txt?path=EGBbw1%2fntoc%2bpzwxllJ9%2bJGPE9LKERomtA0HsrfLArU6YGs%2b7rzIVqyzEJkv7B47bJVLun4Dqyalxamtz1H4OdxFpsONWLWreMporDuHdsGIzuaWf5vtHGEZj4zhW6OOZkijmbj%2fQQe7q7mx072d66QI%2fMeicVzyrHrkMWt3rsAjptydrm%2fWNGspsrVd%2fCNTascZjC7hMNx0bL9koztuga%2bB2dUfRc4FoRDfE%2fBo5SgcV%2ba1RIhvfF0XJSpACyB0tNK%2bWWXskm807oPzMbvLEx0ZLfGiVnLOYbcEx9VPLmtwY2QeAUQWW3HE9x9meY2iPAOTEPGwLFFYCG2SlKREAUPzcmI6kTLdXdknCAGxKC2Ru6RfR2ZR2dpHve4s1ipr&fich=IniciativasXVI_json.txt&Inline=true";
const DATA_DIR = "./data";
const JSON_FILE_PATH = join(DATA_DIR, "parlamento_data.json");

/**
 * Download and save Parliament data
 * @param forceUpdate Force update regardless of file existence
 * @returns The Legislature object from the JSON data
 */
export async function getLegislatureData(forceUpdate = false): Promise<Legislature[]> {
  // Check if update is needed based on file existence and update flag
  const shouldUpdate = forceUpdate || !existsSync(JSON_FILE_PATH);

  if (shouldUpdate) {
    return await downloadAndSaveJson();
  } else {
    console.log(`Using existing data file at ${JSON_FILE_PATH}`);
    const jsonData = await Bun.file(JSON_FILE_PATH).text();
    return JSON.parse(jsonData) as Legislature[];
  }
}

async function downloadAndSaveJson(): Promise<Legislature[]> {
  try {
    console.log("Downloading JSON data from Parlamento...");
    
    // Download the JSON data
    const response = await fetch(JSON_URL);
    
    if (!response.ok) {
      throw new Error(`Failed to download: ${response.status} ${response.statusText}`);
    }
    
    const jsonData = await response.text();
    
    // Ensure data directory exists
    if (!existsSync(DATA_DIR)) {
      Bun.spawnSync(["mkdir", "-p", DATA_DIR]);
    }
    
    // Save the data to file
    writeFileSync(JSON_FILE_PATH, jsonData, "utf-8");
    console.log(`JSON data successfully saved to ${JSON_FILE_PATH}`);
    
    try {
      // Try to parse the data as JSON to verify it's valid
      const parsedData = JSON.parse(jsonData) as Legislature[];
      console.log(`Downloaded data contains ${parsedData.length} initiatives`);
      return parsedData;
    } catch (parseError) {
      console.warn("Warning: Downloaded data is not valid JSON");
      throw parseError;
    }
    
  } catch (error) {
    console.error("Error downloading or saving the data:", error);
    process.exit(1);
  }
}
