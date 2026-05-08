db.pasienter.aggregate([
    {
        $lookup: {
            from: "provins",
            localField: "provins",
            foreignField: "provins._id",
            as: "provinsInfo"
        }
    },
    {
        $unwind: "$provinsInfo"
    },
    {
        $project: {
            _id: 1,
            pasient_id: 1,
            fornavn: 1,
            etternavn: 1,
            kjonn: 1,
            fodselsdag: 1,
            hoyde: 1,
            vekt: 1,
            sted: 1,
            provins: "$provinsInfo._id",
            allergier: 1,
            innleggelser: 1
        }
    },
    {
        $out: "pasienter"
    }
])