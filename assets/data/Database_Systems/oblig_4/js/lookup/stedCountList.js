db.pasienter.aggregate([
    {
        $group: {
            _id: {
                sted: "$sted",
            },
            count: {$sum: 1}
        }
    },
    {
        $project: {
            sted: "$_id.sted",
            antall: "$count",
            _id: 0
        }
    }
]).sort({antall: -1, sted: 1}).forEach(print)