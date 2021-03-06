const express = require('express');
const connection = require('../config')
const router = express.Router();



router.get('/', (req, res) => {
    if (req.query.shop) {
        //Get all products from one shop name
        connection.query('SELECT p.*, c.*, s.name as shopname FROM product AS p JOIN shop AS s ON p.id_shop = s.id JOIN card AS c ON p.id = c.id_product WHERE s.id = ?', [req.query.shop], (err, result) => {
            if (err) {
                res.status(500).json(err)
            } else {
                res.json(result)
            }
        })


    } else if (req.query.theme) {

        //Get all products from one theme
        connection.query('SELECT p.*, c.id AS idcard, c.creationDate, c.id_product, c.id_order, c.format, c.sale_status, c.credit FROM card AS c JOIN product AS p ON p.id = c.id_product JOIN theme AS t ON p.id_theme = t.id WHERE t.name = ?', [req.query.theme], (err, result) => {
            if (err) {
                res.status(500).json('Erreur lors de la récupération de tous les produits selon un thème')
            } else {
                res.json(result)
            }
        })

    } else if (req.query.category) {
        //Get all products from one category
        connection.query('SELECT p.*, ca.* FROM card AS ca JOIN product AS p ON p.id = ca.id_product JOIN category AS c ON p.id_category = c.id WHERE c.type = ?', [req.query.category], (err, result) => {
            if (err) {
                res.status(500).json('Erreur lors de la récupération de tous les produits selon une catégorie')
            } else {
                res.json(result)
            }
        })
    } else if (req.query.tag){
        //Get all the products from one tag
        connection.query('SELECT p.*, c.id AS idcard, c.creationDate, c.id_product, c.id_order, c.format, c.sale_status,  c.credit FROM card AS c JOIN product AS p ON p.id = c.id_product JOIN product_tag AS pt ON p.id = pt.id_product JOIN tag as t ON t.id = pt.id_tag WHERE t.name = ?', [req.query.tag], (err, result) => {
            if (err) {
                res.status(500).json('Erreur lors de la récupération de tous les produits selon un tag')
            } else {
                res.json(result)
            }
        })
    }else if (req.query.city) {
        //Get all products from one city
        connection.query('SELECT p.*, c.* FROM card AS c JOIN product AS p ON p.id = c.id_product JOIN shop AS s ON p.id_shop = s.id JOIN shop_city AS sc ON s.id = sc.id_city JOIN city ON sc.id_city = city.id WHERE city.name_city = ?', [req.query.city], (err, result) => {
            if (err) {
                res.status(500).json('Erreur lors de la récupération de tous les produits selon une ville')
            } else {
                res.json(result)
            }
        })
    } else if (req.query.country) {
        //Get all products from one country
        connection.query('SELECT p.*, c.* FROM card AS c JOIN product AS p ON p.id = c.id_product JOIN shop AS s ON p.id_shop = s.id JOIN shop_country AS sc ON s.id = sc.id_country JOIN country ON sc.id_country = country.id WHERE country.name = ? ', [req.query.country], (err, result) => {
            if (err) {
                res.status(500).json('Erreur lors de la récupération de tous les produits selon un pays')
            } else {
                res.json(result)
            }
        })
    } else {
        //GET all products
        connection.query('SELECT * FROM product', (err, result) => {
            if (err) {
                res.status(500).json('Erreur lors de la récupération de tous les produits')
            } else {
                res.json(result)
            }
        })
    }
})

// get all info products + cards
router.get('/cards', (req, res) => {
    connection.query('SELECT p.*, c.id AS idcard, c.creationDate, c.id_product, c.id_order, c.format, c.sale_status,  c.credit FROM product AS p JOIN card AS c ON p.id = c.id_product', (err, result) => {
        if (err) {
            res.status(500).json('Erreur lors de la récupération de tous les produits')
        } else {
            res.json(result)
        }
    })
})

// Get all ecards where format = 1 (e-card)
router.get('/eCard', (req, res) => {
    connection.query('SELECT p.*, c.id AS idcard, c.creationDate, c.id_product, c.id_order, c.format, c.sale_status,  c.credit FROM product AS p JOIN card AS c ON p.id = c.id_product WHERE format = 1', (err, result) => {
        if (err) {
            res.status(500).json('Erreur lors de la récupération de toutes les ecards')
        } else {
            res.json(result)
        }
    })
})

// Get all real cards where format = 0 (real card)
router.get('/realCard', (req, res) => {
    connection.query('SELECT p.*, c.id AS idcard, c.creationDate, c.id_product, c.id_order, c.format, c.sale_status,  c.credit FROM product AS p JOIN card AS c ON p.id = c.id_product WHERE format = 0', (err, result) => {
        if (err) {
            res.status(500).json('Erreur lors de la récupération de toutes les cartes physiques')
        } else {
            res.json(result)
        }
    })
})

//Get a product by its id
router.get('/:id', (req, res) => {
    connection.query('SELECT p.*, c.id AS idcard, c.creationDate, c.id_product, c.id_order, c.format, c.sale_status,  c.credit FROM product AS p JOIN card AS c ON p.id = c.id_product WHERE p.id = ?',[req.params.id], (err, result) => {
        if (err) {
            res.status(500).json('Erreur lors de la récupération de d\'un produit selon son id')
        } else {
            res.json(result)
        }
    })
})

//Get all products with their tags
router.get('/tags', (req, res) => {
    connection.query('SELECT * FROM product as p LEFT JOIN product_tag AS pt ON p.id = pt.id_product RIGHT JOIN tag AS t ON t.id = pt.id_tag', (err, result) => {
        if (err) {
            res.status(500).json(err)
        } else {
            res.json(result)
        }
    })
})

//Get category product with it's id
router.get('/:idProduct/categories', (req, res) => {
    connection.query('SELECT c.type FROM category AS c JOIN product AS p ON p.id_category = c.id WHERE c.id = ?',req.params.idProduct, (err, result) => {
        if (err) {
            res.status(500).json('Erreur lors de la récupération de la catégorie d\'un produit selon l\'id du produit')
        } else {
            res.json(result)
        }
    })
});

//Get theme product with it's id
router.get('/:idProduct/themes', (req, res) => {
    connection.query('SELECT t.name FROM theme AS t JOIN product AS p ON p.id_theme = t.id WHERE t.id = ?',req.params.idProduct, (err, result) => {
        if (err) {
            res.status(500).json('Erreur lors de la récupération du thème d\'un produit selon l\'id du produit')
        } else {
            res.json(result)
        }
    })
})

//Get customization product with it's id
router.get('/:idProduct/customizations', (req, res) => {
    connection.query('SELECT * FROM customization AS c JOIN theme AS t ON c.id = t.id_customization JOIN product AS p ON p.id_theme = t.id WHERE p.id = ?',req.params.idProduct, (err, result) => {
        if (err) {
            res.status(500).json('Erreur lors de la récupération de la customisation d\'un produit selon l\'id du produit')
        } else {
            res.json(result)
        }
    })
});

//Get all tags product with it's id
router.get('/:idProduct/tags', (req, res) => {
    connection.query('SELECT * FROM tag AS t JOIN product_tag AS pt ON t.id = pt.id_tag JOIN product AS p ON p.id = pt.id_product WHERE p.id = ?',req.params.idProduct, (err, result) => {
        if (err) {
            res.status(500).json('Erreur lors de la récupération deu tag d\'un produit selon l\'id du produit')
        } else {
            res.json(result)
        }
    })
});

//POST a new product
router.post('/', (req, res) => {
    connection.query('INSERT INTO product SET ?',req.body, (err, result) => {
        if (err) {
            res.status(500).json('Erreur lors de la création d\'un nouveau produit')
        } else {
            res.sendStatus(200)
        }
    })
});

// POST one product with one tag
router.post('/:idProduct/tags/:idTag', (req, res) => {
    const { idProduct, idTag } = req.params;
    connection.query('INSERT INTO product_tag (id_tag, id_product) VALUES(?, ?)', [idTag, idProduct], (err, result) => {
        if (err) {
            res.status(500).json('Erreur lors de la jointure d\'un  produit avec un tag');
        } else {
            res.sendStatus(200);
        }
    })
});

// PUT one product with it's ID
router.put('/:id', (req, res) => {
    connection.query('UPDATE product SET ? WHERE id = ?', [req.body, req.params.id], (err, result) => {
        if (err) {
            res.status(500).json('Erreur lors de la modification d\'un produit')
        } else {
            connection.query('SELECT * FROM product WHERE id = ?', req.params.id, (err2, result2) => {
                if (err2) {
                    res.status(500).json('Erreur lors de la récupération du produit modifié')
                } else {
                    res.json(result2)
                }
            })
        }
    })
})

// DELETE one product with it's ID
router.delete('/:id', (req, res) => {
    connection.query('DELETE FROM product WHERE id = ?', [req.params.id], (err, result) => {
        if (err) {
            res.status(500).json('Erreur lors de la suppression d\'un produit')
        } else {
            res.sendStatus(200)
        }
    })
});

// DELETE one tag product with it's ID
router.delete('/:idProduct/tags/:idTag', (req, res) => {
    const { idProduct, idTag } = req.params;
    connection.query('DELETE FROM product_tag WHERE id_product = ? AND id_tag = ?', [idProduct, idTag], (err, result) => {
        if (err) {
            res.status(500).json('Erreur lors de la suppression d\'une jointure d\'un produit et un tag')
        } else {
            res.sendStatus(200)
        }
    })
});

module.exports = router;