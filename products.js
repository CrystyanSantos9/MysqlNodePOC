const init = connection =>{

    const create = async(data) => {
        const conn = await connection
        await conn.query('insert into products (product, price) values (?, ?)', data )
    }

    const remove = async(id) => {
        const conn = await connection
        await conn.query('delete from products where id = ? limit 1;', [id] )
    }

    const update = async(data,id) => {
        const conn = await connection
        await conn.query('update products set product = ? where id = ?;', [...data, id] )
    }


    findImages = async (results) => {
        const conn = await connection
        const productsIds = results.map(product => product.id).join(',')
        const [images] = await conn.query('select * from images where product_id in (' + productsIds + ') group by product_id')
       const mapImages = images.reduce((anterior, atual)=>{
           return {
               ...anterior,
               [atual.product_id]: atual
           }
       },{})

       const products = results.map(product => {
           return {
               ...product,
               images: mapImages[product.id]
           }
       })

        return  products
    }

    const findAll = async() => {
        const conn = await connection
        const [results] = await conn.query('select * from products')
        return  findImages(results)
    }

    const findAllByCategory = async(categoryId) => {
        const conn = await connection
        const [results] =  await conn.query('select * from products where id in (select product_id from categories_products where category_id = ?)', [categoryId])
        return  findImages(results)
    }

    const findAllPaginated = async({pageSize = 1, currentPage = 0 } = {}) => {
        const conn = await connection
        const [results] =  await conn.query(`select * from products limit ${currentPage * pageSize}, ${pageSize+1}`)
        const hasNext = results.length > pageSize

        //se a qtd de dados for maior que a paginacao - remove esse elemento a mais 
        if(results.length > pageSize){
            results.pop()
        }
        //pega as imagens
        const resultWithImages = await findImages(results)

        //retorna um novo objeto paginado
        return  {
            data: resultWithImages,
            hasNext
        }
    }

    const addImage = async(product_id, data)=>{
        const conn =  await connection
        await conn.query('insert into images (product_id, description, url) values (?, ?, ?);', [product_id, ...data])
    }

    const updateCategories = async(productId, categoryIds)=>{
        const conn =  await connection
        await conn.query('START TRANSACTION')
        await conn.query('delete from categories_products where product_id = ?', [productId])
        for await(const categoryId of categoryIds){
            await conn.query('insert into categories_products (category_id, product_id) values (?, ?)', [categoryId, productId])
        }
        await conn.query('ROLLBACK') // ROLLBACK / COMMIT
    }

   return {
        create, 
        remove, 
        update, 
        findAll,
        findAllByCategory,
        findAllPaginated,
        addImage,
        updateCategories
    }
}

module.exports = init 
