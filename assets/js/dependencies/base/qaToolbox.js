const qaToolbox = {
  init () {
    debugger;
    /*
    Delay the start of the script to allow the page to load.  The Context Manager is not attainable unless there is a delay.
    */
    setTimeout(() => {
      debugger;
      this.createElements();
      this.cacheDOM();
      this.buildElements();
      this.attachTools();
      this.attachResources();
      shared.cacheDOM();
      main.init();
    }, 2000);
  },
  // ----------------------------------------
  // tier 1 functions
  createElements () {
    debugger;
    qaToolbox.config = {
      $legendContainer: jQuery('<div>')
        .attr({
          class: 'legendContainer',
        }),
      $toolboxContainer: jQuery('<div>')
        .attr({
          class: 'toolboxContainer',
          id: 'showToolbox',
        }),
      $changeLogUpdateContainer: jQuery('<div>')
        .attr({
          id: 'overlayContainer',
        }),
      $changeLogDisplay: jQuery('<div>')
        .attr({
          id: 'changeLog',
        }),
      $toolboxStyles: jQuery('<style></style>')
        .attr({
          id: 'qa_toolbox',
          type: 'text/css',
        }),
      $myFont: jQuery('<link>')
        .attr({
          id: 'toolFont',
          href: 'https://fonts.googleapis.com/css?family=Montserrat|Lato|Roboto|Source+Code+Pro',
          rel: 'stylesheet',
        }),
      $fontAw: jQuery('<link>')
        .attr({
          id: 'fontAwe',
          // href: 'https://cdn.rawgit.com/akashhall/QA-Toolbox/master/resources/font-awesome-4.7.0/css/font-awesome.css',
          href: 'https://use.fontawesome.com/releases/v5.0.13/css/all.css',
          rel: 'stylesheet',
          integrity: 'sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp',
          crossorigin: 'anonymous'
        }),
      $jQueryUIcss: jQuery('<link>')
        .attr({
          id: 'jqueryUI',
          href: 'https://cdn.rawgit.com/akashhall/QA-Toolbox/master/resources/jquery-ui-1.12.1.custom/jquery-ui.min.css',
          rel: 'stylesheet',
        }),
      $toolStyles: jQuery('<link>')
        .attr({
          id: 'mycss',
          href: shared.getResourceUrl('toolStyles'), // eslint-disable-line camelcase
          rel: 'stylesheet',
          type: 'text/css',
        }),
      $animate: jQuery('<link>')
        .attr({
          id: 'animate',
          href: 'https://rawgit.com/cirept/animate.css/master/animate.css',
          rel: 'stylesheet',
        }),
    };
  },
  cacheDOM () {
    this.body = jQuery('body');
    this.phoneWrapper = jQuery('body .phone-wrapper');
    this.head = jQuery('head');
  },
  buildElements () {

    // load change log details
    let converter = new showdown.Converter();
    let jqxhr = jQuery.get(shared.getResourceUrl('changeLog'), (data) => {
      const changeLog = converter.makeHtml(data);
      qaToolbox.config.$changeLogDisplay.html(changeLog + '<br><br><a href="http://showdownjs.com/" target="_blank">MD converted with Showdown.js</a>');
    }, 'text');

    qaToolbox.config.$changeLogUpdateContainer
      .append(qaToolbox.config.$changeLogDisplay);

    // make legend container draggable
    qaToolbox.config.$legendContainer.draggable();
  },
  attachTools () {
    this.body
      .after(qaToolbox.config.$toolboxContainer)
      .after(qaToolbox.config.$legendContainer);
  },
  /**
   * Append stylesheets to the head element, then toggle the visibility of then
   * tool once the files have been attached.
   */
  attachResources () {
    this.head
      .append(qaToolbox.config.$toolboxStyles)
      .append(qaToolbox.config.$myFont)
      .append(qaToolbox.config.$jQueryUIcss)
      .append(qaToolbox.config.$toolStyles)
      .append(qaToolbox.config.$mycss)
      .append(qaToolbox.config.$fontAw)
      .append(qaToolbox.config.$animate);
  },
};
