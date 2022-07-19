import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import './Project.css';
import axios from 'axios';

// axios
//   .get('http://localhost:3001/portfolios/1')
//   .then((res) => console.log(res.data.data.website))
//   .catch((err) => console.log(err));

// function Project({ project, onRemove }) {
//   return (
//     <div>
//       <div className="ProjectWrap1">
//         <img src={project.img} alt="" name="thumbnail" />
//       </div>
//       <div className="ProjectWrap2">
//         <h3>{project.title}</h3>
//         <div className="date">
//           {project.start_date}
//           {project.end_date}
//         </div>
//         <p>{project.comment}</p>
//         <p>
//           <FontAwesomeIcon icon={faLink} />
//           <a href={project.link} target="_blank">
//             {project.link}
//           </a>
//         </p>
//       </div>
//       <button onClick={() => onRemove(project.id)}>삭제</button>
//     </div>
//   );
// }

// function ProjectList({ projects, onRemove }) {
//   return (
//     <div>
//       {projects.map((project) => (
//         <Project project={project} key={project.id} onRemove={onRemove} />
//       ))}
//     </div>
//   );
// }

function ProjectList() {
  const [websites, setWebsites] = useState([]);
  useEffect(() => {
    const getWebsite = async () => {
      const resWebsite = await fetch(`http://localhost:3001/portfolios/1`, {
        method: 'GET',
      });
      const websiteData = await resWebsite.json();
      const websiteDatas = websiteData.data.website;

      setWebsites(websiteDatas);
    };
    getWebsite();
  }, []);

  return (
    <div>
      {websites.map((e) => {
        return (
          <div>
            <div className="ProjectWrap1">
              <img src={e.img} alt="" name="thumbnail" />
            </div>
            <div className="ProjectWrap2">
              <h3>{e.title}</h3>
              <div className="date">
                {e.start_date}
                {e.end_date}
              </div>
              <p>{e.comment}</p>
              <p>
                <FontAwesomeIcon icon={faLink} />
                <a href={e.link} target="_blank">
                  {e.link}
                </a>
              </p>
            </div>
            <button>삭제</button>
          </div>
        );
      })}
    </div>
  );
}

export default ProjectList;
