class ProductTKC:
    def __init__(self, id, categoria_online, id_online, proveedor, codigo, nombre, suministrador, marca,
                 precio, cantidad, unidad_medida, revision, **kwargs):
        self.id = id
        self.categoria_online = categoria_online
        self.id_online = id_online
        self.proveedor = proveedor
        self.codigo = codigo
        self.nombre = nombre
        self.suministrador = suministrador
        self.marca = marca
        self.precio = precio
        self.cantidad = cantidad
        self.unidad_medida = unidad_medida
        self.revision = revision
        self.extra_attributes = kwargs


class ComboChildren:
    def __init__(self, ID_PRODUCTO_TIENDA, CODIGO_PRODUCTO, NOMBRE_PRODUCTO, NOMBRE_ALMACEN, TOTAL_PRODUCTO, tienda, info, EN_TIENDA, ACTIVO, **kwargs):
        self.id_producto_tienda = ID_PRODUCTO_TIENDA
        self.codigo_producto = CODIGO_PRODUCTO
        self.nombre_producto = NOMBRE_PRODUCTO
        self.nombre_almacen = NOMBRE_ALMACEN
        self.total_producto = TOTAL_PRODUCTO
        self.tienda = tienda
        self.info = info
        self.en_tienda = EN_TIENDA
        self.activo = ACTIVO
        self.extra_attributes = kwargs


class ComboTKC:
    def __init__(self, ID_PRODUCTO_TIENDA, CODIGO_PRODUCTO, NOMBRE_PRODUCTO, NOMBRE_ALMACEN, HIJO_PRODUCTO, TOTAL_PRODUCTO, CREATED, tienda, PESO, PV, **kwargs):
        self.id_producto_tienda = ID_PRODUCTO_TIENDA
        self.codigo_producto = CODIGO_PRODUCTO
        self.nombre_producto = NOMBRE_PRODUCTO
        self.nombre_almacen = NOMBRE_ALMACEN
        self.hijo_producto = [ComboChildren(**hijo) for hijo in HIJO_PRODUCTO]
        self.total_producto = TOTAL_PRODUCTO
        self.created = CREATED
        self.tienda = tienda
        self.peso = PESO
        self.pv = PV
        self.extra_attributes = kwargs


class SellTKC:
    def __init__(self, id, idTienda, categoria_online, codigo, nombre, owner, suministrador, unidad_medida, existencia, total_vendido, precio_prov, importe, precio_venta, **kwargs):
        self.id = id
        self.id_tienda = idTienda
        self.categoria_online = categoria_online
        self.codigo = codigo
        self.nombre = nombre
        self.owner = owner
        self.suministrador = suministrador
        self.unidad_medida = unidad_medida
        self.existencia = existencia
        self.total_vendido = total_vendido
        self.precio_prov = precio_prov
        self.importe = importe
        self.precio_venta = precio_venta
        self.extra_attributes = kwargs
