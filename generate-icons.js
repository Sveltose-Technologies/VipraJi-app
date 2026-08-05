const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SOURCE_IMAGE = 'logo.png';
const ANDROID_RES_PATH = path.join(__dirname, 'android', 'app', 'src', 'main', 'res');

const ANDROID_SIZES = {
  'mipmap-mdpi': 48,
  'mipmap-hdpi': 72,
  'mipmap-xhdpi': 96,
  'mipmap-xxhdpi': 144,
  'mipmap-xxxhdpi': 192,
};

async function generateIcons() {
  if (!fs.existsSync(SOURCE_IMAGE)) {
    console.error(`Source image ${SOURCE_IMAGE} not found!`);
    process.exit(1);
  }

  for (const [folder, size] of Object.entries(ANDROID_SIZES)) {
    const targetFolder = path.join(ANDROID_RES_PATH, folder);
    
    // Create folder if it doesn't exist
    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder, { recursive: true });
    }

    const launcherPath = path.join(targetFolder, 'ic_launcher.png');
    const launcherRoundPath = path.join(targetFolder, 'ic_launcher_round.png');

    await sharp(SOURCE_IMAGE)
      .resize(size, size)
      .toFile(launcherPath);
      
    await sharp(SOURCE_IMAGE)
      .resize(size, size)
      .toFile(launcherRoundPath);
      
    console.log(`Generated ${size}x${size} icon in ${folder}`);
  }
  
  console.log('App icons generated successfully!');
}

generateIcons().catch(console.error);
