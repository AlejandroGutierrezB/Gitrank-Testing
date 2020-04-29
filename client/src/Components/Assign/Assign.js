import React from 'react';
import '../Button/Button';
import { ASSIGN_TO_USER } from '../../ApiClient/Queries';
import { useMutation } from '@apollo/react-hooks';
import Button from '../Button/Button';
import cx from 'classnames';

function Assign ({ userId, prId, className, isAssigned, currentAssignees }) {
  let prevAssignees = [];
  if (currentAssignees.length) {
    prevAssignees = [
      ...currentAssignees.map(element => {
        return element.id;
      }),
    ];
  }

  const assignId = [...prevAssignees];

  const [assignToMe, { data }] = useMutation(ASSIGN_TO_USER);
  const classnames = cx('Assign', className);


  function handleAssignment (event) {
    if (!isAssigned) {
      assignId.push(userId);
      event.preventDefault();
      assignToMe({ variables: { pullRequestId: prId, assigneeIds: assignId } });
      if (data) {
        console.log('data: ', JSON.stringify(data));
        console.log('Succesfully assigned to you');
      }
    } else {
      event.preventDefault();
      assignToMe({
        variables: {
          pullRequestId: prId,
          assigneeIds: assignId.filter(element => element !== userId),
        },
      });
      if (data) {
        console.log('Succesfully unassigned');
      }
    }
  }

  return (
    <Button
      icon='user-check'
      title='Assign to me'
      onClick={handleAssignment}
      className={isAssigned ? `${classnames}--isFavorite` : classnames}
    />
  );
}

export default Assign;
