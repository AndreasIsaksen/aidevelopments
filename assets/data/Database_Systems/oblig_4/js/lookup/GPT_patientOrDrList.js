db.pasienter.aggregate([
  {
    $lookup: {
      from: "innleggelser",
      localField: "innleggelser",
      foreignField: "_id",
      as: "innleggelser_info"
    }
  },
  {
    $lookup: {
      from: "leger",
      localField: "innleggelser_info.lege",
      foreignField: "_id",
      as: "lege_info"
    }
  },
  {
    $unwind: {
      path: "$lege_info",
      preserveNullAndEmptyArrays: true
    }
  },
  {
    $project: {
      _id: 0,
      pasient: {
        $concat: [
          { $ifNull: ["$fornavn", ""] }, " ", { $ifNull: ["$etternavn", ""] }
        ]
      },
      lege: {
        $concat: [
          { $ifNull: ["$lege_info.fornavn", ""] }, {$ifNull: [" ", ""]}, { $ifNull: ["$lege_info.etternavn", ""] }
        ]
      },
      spesialitet: "$lege_info.spesialitet"
    }
  }
]).forEach(printjson);
