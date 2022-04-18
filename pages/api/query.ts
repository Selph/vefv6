export const Query = `
fragment page on Page {
    _meta {
      uid
    }
    title
    body {
      ... on PageBodyAccordion {
        type
        primary {
          accordion_title
        }
        fields {
          sub_title
          sub_content
        }
      }
      ... on PageBodyContent {
        type 
        label 
        primary {
          content
        }
      }
      ... on PageBodyImage {
        type 
        label 
        primary {
          image
        }
      }
      ... on PageBodyEmbed {
        type 
        label 
        primary {
          embed
        }
      }
    }
  }
  
  query ($uid: String = "") {
    page(uid: $uid, lang: "is") {
      ...page
    }
    allPages {
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          _meta {
            uid
          }
          title
        }
      }
    }
    allHomepages {
      edges {
        node {
          title
          intro
        }
      }
    }
  }
  `;