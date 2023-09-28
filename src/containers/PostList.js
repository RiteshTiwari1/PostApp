// // PostList.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import PostCard from '../components/postCard';

// const PostList = () => {
//   const [postContainer,setPostContainer]=useState([]);
//   const [posts, setPosts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         {console.log(currentPage);}
//         // const response = await axios.get(
//         //   `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=6`
//         // );

//         const response=await axios.get('https://jsonplaceholder.typicode.com/posts')
//         setPosts(response.data);
//         setIsLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [currentPage]);

//   const handleRemove = (postId) => {
//     setPosts(posts.filter((post) => post.id !== postId));
//   };

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   // const renderPosts = () => {
//   //   if (isLoading) {
//   //     return <p>Loading...</p>;
//   //   }

//   //   return posts.map((post) => (
//   //     <PostCard key={post.id} post={post} onRemove={handleRemove} />
//   //   ));
//   // };
//   const renderPosts = () => {
//     if (isLoading) {
//       return <p>Loading...</p>;
//     }
  
//     const startIndex = (currentPage - 1) * 6; // Calculate the starting index based on the current page
//     const endIndex = startIndex + 6; // Calculate the ending index (limit to 6 cards)
  
//     return posts.slice(startIndex, endIndex).map((post) => (
//       <PostCard key={post.id} post={post} onRemove={handleRemove} />
//     ));
//   };
  
//   return (
//     <div className="post-list">
//       {renderPosts()}
      
//       <div className="pagination">
//         <button
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </button>
//         {Array.from({ length: 10 }).map((_, index) => (
//           <button
//             key={index}
//             onClick={() => handlePageChange(index + 1)}
//             className={currentPage === index + 1 ? 'active' : ''}
//           >
//             {index + 1}
//           </button>
//         ))}
//         <button
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === 10}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PostList;


// PostList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from '../components/postCard';

const PostList = () => {
  const [postContainer, setPostContainer] = useState([]); // Store all API data
  const [posts, setPosts] = useState([]); // Display 6 cards
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts`
        );
        setPostContainer(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Fetch data once initially

  useEffect(() => {
    const startIndex = (currentPage - 1) * 6;
    const endIndex = startIndex + 6;

    // Slice the data from postContainer for the current page
    const slicedPosts = postContainer.slice(startIndex, endIndex);
    setPosts(slicedPosts);
  }, [currentPage, postContainer]); // Update posts when currentPage or postContainer changes

  const handleRemove = (postId) => {
    // Remove the post from postContainer
    setPostContainer(postContainer.filter((post) => post.id !== postId));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPosts = () => {
    if (isLoading) {
      return <p>Loading...</p>;
    }

    return posts.map((post) => (
      <PostCard key={post.id} post={post} onRemove={handleRemove} />
    ));
  };

  return (
    <div className="post-list">
      {renderPosts()}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: Math.ceil(postContainer.length / 6) }).map(
          (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          )
        )}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(postContainer.length / 6)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PostList;
