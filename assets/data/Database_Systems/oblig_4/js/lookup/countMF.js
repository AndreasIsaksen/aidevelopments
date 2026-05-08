db.pasienter.aggregate([
    {
        $group: {
            _id: null,
            Menn: {
                $sum: {
                    $cond: [{ $eq: ["$kjonn", "M"] }, 1, 0]
                }
            },
            Kvinner: {
                $sum: {
                    $cond: [{ $eq: ["$kjonn", "F"] }, 1, 0]
                }
            }
        }
    },
    {
        $project: {
            _id: 0,
            Antall_menn: "$Menn",
            Antall_kvinner: "$Kvinner"
        }
    }
]).forEach(print)
