const db = require('./db')
const categories = require('./categories')(db)
const products = require('./products')(db)

const test  = async() => {
    // await categories.create(['Carnes Bovinas'])
    // await categories.remove(8)
    // await categories.update(['Informática & Jogos'], 6)
    // const listCategories = await categories.findAll()
//    await products.addImage(6, ['Imagem Aparelho som', 'https://repository.ce/img'])
// const prods = await products.findAll()
// const prods = await products.findAllByCategory(4)
// const prods = await products.findAllPaginated({pageSize : 2, currentPage : 5 });

const prods = await products.updateCategories(3, [6,6])
// for(let i=0; i<1000; i++){
//     products.findAllPaginated().then(
//         prods=> console.log(prods)
//     )
// }
}
test()