
 

import React from "react";
import TransfJoinWorkspaceForm from "../Home/TransfJoinWorkspaceForm"
import RemoveUserForm from "./RemoveUserForm";

const TransferUserForm = ({workspace, render_func}) => {
  return (
    <div>
      <h2>Transfer User from This Workspace:</h2>
      <div>
        <TransfJoinWorkspaceForm />
        <RemoveUserForm workspaceID={workspace} render_func={render_func}/>
      </div>
    </div>
  );
};

export default TransferUserForm;