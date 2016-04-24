import prefixAll from 'inline-style-prefix-all';

const sectionStyle = prefixAll({
  'position': 'absolute',
  'height': '100%',
  'width': '100%'
});

export default {
  buttons: prefixAll({
    'verticalAlign': 'middle',
    'display': 'inline-block'
  }),
  autocomplete: {
    container: prefixAll({
      'minWidth': '250px',
      'width': '40%',
      'margin': 'auto'
    })
  },
  container: {
    main: prefixAll({
      'padding': 20,
      'textAlign': 'center',
      'display': 'block',
      'margin': 'auto'
    })
  },
  link: {
    main: prefixAll({
      'fontFamily': 'monospace',
      'display': 'inline-block',
      'width': '80%',
      'whiteSpace': 'nowrap',
      'overflow': 'hidden',
      'textOverflow': 'ellipsis',
      'verticalAlign': 'middle'
    })
  },
  mediaCard: {
    container: prefixAll({
      'position': 'absolute',
      'top': 'calc(25% + 200px)',
      'left': '50%',
      'transform': 'translate3D(-50%,-50%,0)',
      'width': '80vmin'
    }),
    subtitle: prefixAll({
      'display': 'flex',
      'alignItems': 'center'
    })
  },
  nav: {
    button: prefixAll({
      'padding': '5px 0',
      'minWidth': 'auto'
    }),
    label: prefixAll({
      'color': '#fff',
      'display': 'block',
      'fontSize': '70%',
      'lineHeight': 1.5
    })
  },
  submitDialog: {
    main: prefixAll({
      'border': 0,
      'margin': 0,
      'padding': 0
    })
  },
  video: {
    container: prefixAll({
      'position': 'relative',
      'paddingBottom': '56.25%',
      'paddingTop': '25px',
      'height': '0'
    }),
    videoItem: prefixAll({
      'border': '0',
      'position': 'absolute',
      'top': '0',
      'left': '0',
      'width': '100%',
      'height': '100%'
    })
  },
  pages: {
    home: {
      cardContainer:  prefixAll({
        'position': 'absolute',
        'right': '1%',
        'left': '1%',
        'top': 'calc(1% + 70px)',
        'bottom': '1%',
        'display': 'flex',
        'flexWrap': 'wrap',
        'flexDirection': 'row',
        'justifyContent': 'space-between'
      }),
      card: prefixAll({
        'position': 'relative',
        'marginBottom': '1%',
        'cursor': 'pointer',
        'height': '32%',
        'width': '49.50%'
      })
    },
    category: {
      container: sectionStyle
    },
    quickReplies: {
      container: sectionStyle
    }
  }
};
