export const styles = {
    "profile": {
      "display": "flex",
    },
    "rightbarFollowButton": {
      "marginTop": "30px",
      "marginBottom": "10px",
      "border": "1px solid #ff458a",
      "backgroundColor": "#ff458a",
      transition: 'all .3s ease',
      textTransform: 'uppercase',
      "color": "#111",
      "borderRadius": "10px",
      "padding": "8px 25px",
      "display": "flex",
      "alignItems": "center",
      "fontSize": "16px",
      "fontWeight": "400",
      "cursor": "pointer",
      '&:focus': {
        outline: 'none',
      },
      '&:hover': {
          background: 'transparent',
          color: '#d0d1ca'
      }
    },
    "profileRight": {
      "flex": "9",
      background: '#1b2439',
      position: 'relative'
    },
    "profileCover": {
      "height": "320px",
      "position": "relative"
    },
    "profileCoverImg": {
      "width": "100%",
      "height": "100%",
      "objectFit": "cover"
    },
    "shareInput": {
      "border": "none",
      "width": "100%",
      backgroundColor: '#273047',
      lineHeight:'16px',
      padding:'15px 10px',
      color:'#d0d3db',
      fontSize:'16px',
      '&:focus': {
          outline: 'none',
      }
    },
    "profileUserImg": {
      "width": "150px",
      "height": "150px",
      "borderRadius": "50%",
      "objectFit": "cover",
      "position": "absolute",
      "left": "0",
      "right": "0",
      "margin": "auto",
      "top": "150px",
    },
    "photosInfo": {
      "display": "flex",
      padding: '0px 0px',
      "flexDirection": "row",
      "alignItems": "center",
      "justifyContent": "center",
      background: '#1b2439'
    },
    "profileInfo": {
      "display": "flex",
      padding: '30px 0px',
      "flexDirection": "column",
      "alignItems": "center",
      "justifyContent": "center",
      background: '#1b2439'
    },
    "profileInfoName": {
      "fontSize": "24px",
      color: '#d0d3db'
    },
    "profileInfoDesc": {
      "fontWeight": "400",
      fontSize: '17px',
      color: '#d0d1ca',
      letterSpacing: '.5px',
      marginTop: '5px'
    },
    "profileRightBottom": {
      "display": "flex",
    }
  }