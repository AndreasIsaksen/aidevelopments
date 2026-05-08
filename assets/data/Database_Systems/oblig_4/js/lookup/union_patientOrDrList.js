db.pasienter.aggregate([
    {
        $project: {
            rolle: "pasient",
            fornavn: 1,
            etternavn: 1,
            _id: 0
        }
    },
    {
        $unionWith: {
            coll: "leger",
            pipeline: [{
                $project: {
                    rolle: "lege",
                    fornavn: 1,
                    etternavn: 1,
                    _id: 0
                }
            }]
        }
    }
]).sort({rolle: 1}).forEach(print)