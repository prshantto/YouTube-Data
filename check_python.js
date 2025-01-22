const { exec } = require("child_process");

exec("python --version", (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`Python Version: ${stdout}`);
});
