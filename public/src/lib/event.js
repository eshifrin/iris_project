// export default function (posts){
//   return posts.map(post => {

//     let startTime = new Date(post.scheduledDateTime)
//     var endTime = new Date(post.scheduledDateTime)
//     endTime.setSeconds(endTime.getSeconds() + 1);
    
//     let FB = post.postToFacebook ? 'fb' : '';
//     let TW = post.postToTwitter ? 'tw' : '';
//     let calendarText = !!FB && !!TW ? 'fb | tw' : `${FB}${TW}`
//     calendarText +=`: ${post.text}`;

//     return {
//       start: startTime,
//       end: endTime,
//       title: calendarText
//     };
//   });
// }


export default function (posts){
  return posts.map(post => {

    let startTime = new Date(post.scheduledDateTime)
    var endTime = new Date(post.scheduledDateTime)
    endTime.setSeconds(endTime.getSeconds() + 1);

    return {
      start: startTime,
      end: endTime,
      title: post.text,
      fb: post.postToFacebook,
      tw: post.postToTwitter
    };
  });
}
