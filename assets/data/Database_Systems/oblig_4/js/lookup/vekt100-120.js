db.pasienter.find(
    {
        $and: [
            {
                vekt: {
                    $gte: 100,
                    $lte: 120
                },
            }
        ]
    },
    {
        fornavn: 1,
        etternavn: 1,
        _id: 0,
        vekt: 1
    }
).sort({vekt:1}).forEach(print)