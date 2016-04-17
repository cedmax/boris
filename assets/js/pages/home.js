import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';

export default class Home extends React.Component {
  render() {
    let cards = Object.keys( this.props.data )
      .filter( category => this.props.data[ category ].videos )
      .map( ( category, i ) => {
        let data = this.props.data[ category ];
        let numOfVid = Object.keys( data.videos ).length;
        let third = (( i + 1 ) <= 3 );
        return (
          <Card
            onClick={()=>this.props.onClick( category )}
            key={category}
            style={{
              position: 'relative',
              marginBottom: '1%',
              cursor: 'pointer',
              height: '49%',
              background: `url(/img/${category}.jpg) no-repeat center / cover`,
              width: third ? '32.75%' : '49.5%'
            }}>
            <CardMedia
              style={{ height: '100%' }}
              overlay={
                <CardTitle
                  title={data.title}
                  subtitle={<span><b>{numOfVid}</b> video</span>}
                ></CardTitle>
            }>
            </CardMedia>
          </Card>
        );
      } );

    return (
      <div style={{
        position: 'absolute',
        right: '1%',
        left: '1%',
        top: 'calc(1% + 70px)',
        bottom: '1%',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}>
        { cards }
      </div>
    );
  }
}
