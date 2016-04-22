import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import props from 'js/props';

export default class Home extends React.Component {
  card( categoryData, category ) {
    const title = categoryData.title;
    const numOfVid = Object.keys( categoryData.videos ).length;

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
          'width': '32.75%'
        } }
      >
        <a
          href={ `/${category}` }
          onClick={ ( e )=>e.preventDefault() }
        >
          <CardMedia
            style={ { 'height': '100%' } }
            overlay={
              <CardTitle
                title={ title }
                subtitle={ <span><b>{numOfVid}</b> video</span> }
              />
            }
          />
        </a>
      </Card>
    );
  }


  render() {
    var categories = this.props.data.categories;
    let cards = Object.keys( categories )
      .map( ( category ) => {
        return this.card( categories[ category ], category );
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
        { this.card( this.props.data.r, 'r' ) }
        { cards }
      </div>
    );
  }
}

Home.propTypes = {
  data: React.PropTypes.shape( {
    categories: React.PropTypes.objectOf( props.section ).isRequired,
    r: props.section
  } ).isRequired,
  navigateTo: React.PropTypes.func.isRequired
};
