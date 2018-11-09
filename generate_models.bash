# sequelize model:create --name grocery_item \
# 	--attributes 'store:integer,item:string,qty:integer'

# sequelize model:create --name grocery_store \
# 	--attributes 'store:string, city:string'
sequelize model:create --name aisle \
	--attributes 'number:integer, store_id:integer'