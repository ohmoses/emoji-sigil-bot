import generateSigil from "../generateSigil"

const getSigil = () => generateSigil(process.argv[2])

for (let i = 0; i < 10; i++) {
  console.log(getSigil())
  console.log("\n")
}
