import React from 'react';

const TwitterShare = () => {
    return(
        <React.Fragment>
            <a href="https://twitter.com/intent/tweet?&text=Check out this GraphQL course for React developers by @HasuraHQ https://learn.hasura.io/graphql/react" target="_blank"><img className={'twitterIcon'} src={'https://img.icons8.com/color/48/000000/twitter.png'} alt={'Twitter'} /></a>
        </React.Fragment>
    )
};

export default TwitterShare;