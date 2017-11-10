const { check, validationResult } = require('express-validator/check');

const validationTodo = [
    check('task')
        .exists()
        .withMessage('The "task" field is required')
        .isLength({min : 5})
        .withMessage('The "task" field min size is 5'),
    check('status')
        .isIn(['todo', 'done'])
        .withMessage('The status field need be "todo" or "done"')
];

module.exports = app => {
    app.post('/todo', validationTodo, (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.mapped() });
        }
        
        const {saveTodo} = app.services.index;
        const todo = req.body;
        saveTodo(todo)
            .then(newTodo => res.status(201).json(newTodo))
            .catch(err => res.status(500).json(err));
    });

    app.put('/todo/:id', (req, res) => {
        const {doneTodo} = app.services.index;
        const {id} = req.params;
        doneTodo(id)
            .then(todo => res.status(200).json(todo))
            .catch(err => res.status(500).json(err));
    });

    app.delete('/todo/:id', (req, res) => {
        const {deleteTodo} = app.services.index;
        const {id} = req.params;
        deleteTodo(id)
            .then(() => res.sendStatus(204))
            .catch(err => res.status(500).json(err));
    });

    app.get('/todo', (req, res) => {
        const {getAllTodo} = app.services.index;
        getAllTodo()
            .then(result => res.status(200).json(result))
            .catch(err => res.status(500).json(err));
    });
}