db.innleggelser.aggregate([
    {
        $lookup: {
            from: "pasienter",
            localField: "pasient_id",
            foreignField: "pasient_id",
            as: "pasientInfo"
        }
    },
    {
        $unwind: "$pasientInfo"
    },
    {
        $project: {
            _id: 1,
            pasient: "$pasientInfo._id",
            innleggelsesdato: 1,
            utskrivningsdato: 1,
            diagnose: 1,
            lege: 1
        }
    },
    {
        $out: "innleggelser"
    }
])