# sequelize model:create --name grocery_item \
# 	--attributes 'store:integer,item:string,qty:integer'

# sequelize model:create --name grocery_store \
# 	--attributes 'store:string, city:string'
# sequelize model:create --name aisle \
# 	--attributes 'number:integer, store_id:integer'


sequelize model:create --name user_cart \
	--attributes 'user:integer, item:integer, aisle:integer, store:integer'