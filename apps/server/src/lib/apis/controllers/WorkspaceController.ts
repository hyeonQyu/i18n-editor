import { GetWorkspaceRequest, GetWorkspaceResponse } from 'i18n-editor-common/lib/defines/api/models/worksapce';
import { ControllerMethod } from '../../defines/api';
import BaseController from '../../utils/BaseController';
import workspaceService from '../services/WorkspaceService';

export default class WorkspaceController extends BaseController {
  private getWorkspace: ControllerMethod<never, GetWorkspaceRequest, GetWorkspaceResponse> = {
    path: '/',
    method: 'get',
    handler: async () => {
      const workspaces = await workspaceService.getWorkspaces();
      return { workspaces };
    },
  };
}
