import moment from 'moment';

export const formatDate = (date) => {
  //date --> 2020-02-26T20:19:38Z
  const newDate = moment(date).format('L LT'); // returns date as DD/MM/YYY H:MM A/PM
  return newDate;
}

export const dateDiff = (updated) => {
  return moment(updated).fromNow();
}

export const statusDetails = (reviews) => {
  const iterableRev = reviewsByAuthor(reviews);
  // reviewsByAuthor returns an obj like {12345678abcde=: Array(1), 987654zswer: Array(1)} -- where Array is an array of objects that represent each of the reviews by authorId
  const reviewsToShow = [];
    for (let key in iterableRev) {
      reviewsToShow.push(iterableRev[key][iterableRev[key].length-1]); // last element in the array is the most recent one
    }
    return reviewsToShow;
  }

export const reviewsByAuthor = (reviews) => {
  const orderedRev = reviews.map((element) => {
    return ({
      author: element.author.name,
      author_id: element.author.id,
      createdAt: element.createdAt,
      state: element.state
    });
  });
  const orderById = orderedRev.reduce((acc, obj) => {
    let key = obj.author_id;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
  return orderById;
}

export const beautifyStatus = (status) => {
  switch(status){
    case 'OPEN':
      return status[0]+status.substring(1).toLowerCase();
    case 'MERGED':
      return status[0]+status.substring(1).toLowerCase();
    case 'CLOSED':
      return status[0]+status.substring(1).toLowerCase();
    case 'CHANGES_REQUESTED':
      return 'requested changes';
    default:
      return status.toLowerCase();
  }
}

export const chooseEmoji = (status) => {
  switch(status){
    case 'OPEN':
      return '🔥'
    case 'MERGED':
      return '😁👍'
    case 'CLOSED':
      return '🛑'
    case 'CHANGES_REQUESTED':
      return '🙋';
    default:
      return '💯' ;
  }
}

export const pinItem = (id) => {
  let pinnedItems = [];
  pinnedItems.push(id);

  if(!localStorage.getItem('pinnedItems')){
    localStorage.setItem('pinnedItems', JSON.stringify(pinnedItems));
  } else {
    let prevItems = JSON.parse(localStorage.getItem('pinnedItems'));
    pinnedItems = [...pinnedItems, ...prevItems];
    localStorage.setItem('pinnedItems', JSON.stringify(pinnedItems));
  }
}
