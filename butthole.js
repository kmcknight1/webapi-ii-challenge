router.post('/:id/comments', (req, res) => {
    const comment = {
        text: req.body.text,
        post_id: req.params.id
    }

    Posts.insert(comment) res(200) blah blah blah
})