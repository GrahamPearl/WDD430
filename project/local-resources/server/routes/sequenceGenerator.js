var Sequence = require('../models/sequence');

var maxDocumentId;
var maxMessageId;
var maxContactId;
var sequenceId = null;

function SequenceGenerator() {

  Sequence.findOne()
    .exec(function(err, sequence) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }

      sequenceId = sequence._id;
      maxContactId = sequence.maxContactId;
      maxNoticeId = sequence.maxNoticeId;
      maxResourcesId = sequence.maxResourcesId;
      maxVideosId = sequence.maxVideosId;
      
    });
}

SequenceGenerator.prototype.nextId = function(collectionType) {

  var updateObject = {};
  var nextId;

  switch (collectionType) {
    case 'contacts':
      maxContactId++;
      updateObject = {maxContactId: maxContactId};
      nextId = maxDocumentId;
      break;
    case 'notices':
      maxNoticeId++;
      updateObject = {maxNoticeId: maxNoticeId};
      nextId = maxMessageId;
      break;
    case 'resources':
      maxResourcesId++;
      updateObject = {maxResourcesId: maxResourcesId};
      nextId = maxResourcesId;
      break;
      case 'videos':
        maxVideosId++;
        updateObject = {maxVideosId: maxVideosId};
        nextId = maxVideosId;
        break;      
    default:
      return -1;
  }

  Sequence.update({_id: sequenceId}, {$set: updateObject},
    function(err) {
      if (err) {
        console.log("nextId error = " + err);
        return null
      }
    });

  return nextId;
}

module.exports = new SequenceGenerator();
