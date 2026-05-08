db.innleggelser.aggregate([
    {
        $lookup: {
            from: "leger",
            localField: "lege_id",
            foreignField: "lege_id",
            as: "legeInfo"
        }
    },
    {
        $unwind: "$legeInfo"
    },
    {
        $project: {
            _id: 1,
            pasient_id: 1,
            innleggelsesdato: 1,
            utskrivningsdato: 1,
            diagnose: 1,
            lege: "$legeInfo._id"
        }
    },
    {
        $out: "innleggelser"
    }
])