db.pasienter.aggregate([
    {
      $lookup: {
        from: "innleggelser",
        localField: "pasient_id",
        foreignField: "pasient_id",
        as: "innleggelser"
      }
    },
    {
      $unwind: {
        path: "$innleggelser",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group: {
        _id: "$_id",
        pasient_id: { $first: "$pasient_id" },
        fornavn: { $first: "$fornavn" },
        etternavn: { $first: "$etternavn" },
        kjonn: { $first: "$kjonn" },
        fodselsdag: { $first: "$fodselsdag" },
        hoyde: { $first: "$hoyde" },
        vekt: { $first: "$vekt" },
        sted: { $first: "$sted" },
        provins: { $first: "$provins" },
        allergier: { $first: "$allergier" },
        innleggelser: { $push: "$innleggelser._id" }
      }
    },
    {
      $merge: {
        into: "pasienter",
        whenMatched: "replace"
      }
    }
  ])
  