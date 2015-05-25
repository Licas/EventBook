
Template.registerHelper('formatDate', function(date) {
    //console.log(moment(date));
  return moment(date).format('DD/MM/YYYY HH:mm');
});
