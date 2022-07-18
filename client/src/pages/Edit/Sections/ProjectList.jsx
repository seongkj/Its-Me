import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import './Project.css';

function Project({ project, onRemove }) {
  return (
    <div>
      <div className="ProjectWrap1">
        <img src={project.thumbnail} alt="" name="thumbnail" />
      </div>
      <div className="ProjectWrap2">
        <h3>{project.title}</h3>
        <div className="date">
          {project.start_date}
          {project.end_date}
        </div>
        <p>{project.comment}</p>
        <p>
          <FontAwesomeIcon icon={faLink} />
          <a href={project.link} target="_blank">
            {project.link}
          </a>
        </p>
      </div>
      <button onClick={() => onRemove(project.id)}>삭제</button>
    </div>
  );
}

function ProjectList({ projects, onRemove }) {
  return (
    <div>
      {projects.map((project) => (
        <Project project={project} key={project.id} onRemove={onRemove} />
      ))}
    </div>
  );
}

export default ProjectList;
