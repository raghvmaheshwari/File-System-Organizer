function helpFn() {
    console.log(`
    List of all the commands:
    1)Tree :    node main.js tree "directorypath"
    2)Organize: node main.js  organize "directorypath"
    3)Help:     node main .js help
    `);
}
module.exports={
    helpKey:helpFn     
}