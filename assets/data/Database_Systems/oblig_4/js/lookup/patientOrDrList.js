db.innleggelser.aggregate([
    {
        $group: {
            _id: {
                lege: "$lege",
                pasient: "$pasient"
            }
        }
    },
    {
        $lookup :{
            from: "leger",
            localField: "lege",
            foreignField: "_id",
            as: "PH_lege"
        }
    },
    {
        $unwind: "$PH_lege"
    },
    {
        $lookup: {
            from: "pasienter",
            localField: "pasient",
            foreignField: "_id",
            as: "PH_pasient"
        }
    },
    {
        $unwind: "$PH_pasient"
    },
    {
        $project: {
            _id: 0,
            lege: "$PH_lege.fornavn",
            pasient: "$PH_pasient.fornavn"
        }
    }
]).forEach(print)