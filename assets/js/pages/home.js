import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import style from 'js/style';
import props from 'js/props';

export default class Home extends React.Component {
  card( categoryData, category ) {
    const {
      title
    } = categoryData;
    const numOfVid = Object.keys( categoryData.videos ).length;

    return (
      <Card
        onClick={ ()=>this.props.navigateTo( category ) }
        key={ category }
        style={ Object.assign({}, style.pages.home.card, {
          'background': `url(/img/${category}.jpg) no-repeat center / cover`
        }) }
      >
        <a
          href={ `/${category}` }
          onClick={ ( e )=>e.preventDefault() }
        >
          <CardMedia
            style={{
              'height': '100%'
            }}
            overlay={
              <CardTitle
                title={ title }
                subtitle={ <span><b>{ numOfVid }</b> video</span> }
              />
            }
          />
        </a>
      </Card>
    );
  }

  render() {
    const {
      categories
    } = this.props.data;

    let cards = Object.keys( categories )
      .map( category => this.card( categories[ category ], category ));

    return (
      <div
        style={ style.pages.home.cardContainer }
      >
        { this.card( this.props.data.r, 'r' ) }
        { cards }
      </div>
    );
  }
}

Home.propTypes = {
  data: React.PropTypes.shape({
    categories: React.PropTypes.objectOf( props.section ).isRequired,
    r: props.section
  }).isRequired,
  navigateTo: React.PropTypes.func.isRequired
};
