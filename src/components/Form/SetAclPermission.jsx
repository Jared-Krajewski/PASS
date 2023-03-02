import { useSession } from "@inrupt/solid-ui-react";
import { runNotification, setDocAclPermission } from "../../utils";
import { useStatusNotification } from "../../hooks";
import StatusNotification from "./StatusNotification";
import DocumentSelection from "./DocumentSelection";

const SetAclPermission = () => {
  const { session } = useSession();
  const { state, dispatch } = useStatusNotification();

  const handleAclPermission = async (event) => {
    event.preventDefault();
    try {
      await setDocAclPermission(
        session,
        event.target.document.value,
        event.target.setAclPerms.value,
        event.target.setAclTo.value
      );
      runNotification(
        `${event.target.setAclPerms.value} permission to ${event.target.setAclTo.value} for ${event.target.document.value}`,
        7,
        state,
        dispatch
      );
    } catch (error) {
      runNotification(
        "Set permission failed. Reason: File not found",
        7,
        state,
        dispatch
      );
    }
  };

  const formRowStyle = {
    margin: "20px 0",
  };

  return (
    <section
      hidden={!session.info.isLoggedIn ? "hidden" : ""}
      className="panel"
    >
      <strong>Permission to Files</strong>
      <form onSubmit={handleAclPermission} autoComplete="off">
        <div style={formRowStyle}>
          <label htmlFor="set-acl-to">
            Paste other user's pod url (i.e., username.opencommons.net):{" "}
          </label>
          <br />
          <br />
          <input id="set-acl-to" size="60" type="text" name="setAclTo" />
        </div>
        <div style={formRowStyle}>
          <label htmlFor="set-acl-doctype">Select document type: </label>
          <DocumentSelection htmlId="set-acl-doctype" />{" "}
        </div>
        <div style={formRowStyle}>
          <label htmlFor="set-acl-permission">
            Give or revoke permission?{" "}
          </label>
          <select id="set-acl-permission" name="setAclPerms">
            <option>Give</option>
            <option>Revoke</option>
          </select>{" "}
        </div>
        <button type="submit">Set Permission</button>
      </form>
      <StatusNotification
        notification={state.message}
        statusType="Permission status"
        defaultMessage="Permission to be set..."
        locationUrl={state.documentLocation}
      />
    </section>
  );
};

export default SetAclPermission;
