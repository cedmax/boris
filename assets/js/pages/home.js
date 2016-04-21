import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import props from 'js/props';

export default class Home extends React.Component {
  render() {
    var categories = this.props.data.categories;
    let cards = Object.keys( categories )
      .map( ( category, i ) => {
        let numOfVid = Object.keys( categories[ category ].videos ).length;
        let third = (( i + 1 ) <= 3 );
        return (
          <Card
            onClick={ ()=>this.props.navigateTo( category ) }
            key={ category }
            style={ {
              'position': 'relative',
              'marginBottom': '1%',
              'cursor': 'pointer',
              'height': '49%',
              'background': `url(/img/${category}.jpg) no-repeat center / cover`,
              'width': third ? '32.75%' : '49.5%'
            } }
          >
            <CardMedia
              style={ { 'height': '100%' } }
              overlay={
                <CardTitle
                  title={ categories[ category ].title }
                  subtitle={ <span><b>{numOfVid}</b> video</span> }
                />
              }
            />
          </Card>
        );
      } );

    return (
      <div
        style={ {
          'position': 'absolute',
          'right': '1%',
          'left': '1%',
          'top': 'calc(1% + 70px)',
          'bottom': '1%',
          'display': 'flex',
          'flexWrap': 'wrap',
          'flexDirection': 'row',
          'justifyContent': 'space-between'
        } }
      >
        { cards }
      </div>
    );
  }
}

Home.propTypes = {
  data: React.PropTypes.shape( {
    categories: React.PropTypes.objectOf( props.section ).isRequired
  } ).isRequired,
  navigateTo: React.PropTypes.func.isRequired
};
