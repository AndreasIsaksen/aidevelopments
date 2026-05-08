db.innleggelser.aggregate([
    {
        $group: {
            _id: {
                pasient: "$pasient",
                diagnose: "$diagnose"
            },
            count: { $sum: 1 }
        }
    },
    {
        $match: {
            count: { $gt: 1}
        }
    },
    {
        $project: {
            pasient: "$_id.pasient",
            diagnose: "$_id.diagnose",
            count: 1,
            _id: 0,
        }
    }
]).forEach(printjson)