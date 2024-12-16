import configService from '../ConfigService';

const getWorkspaces = async () => {
  const { workspaces } = configService.getConfig();
  return workspaces;
};

const workspaceService = {
  getWorkspaces,
};

export default workspaceService;
