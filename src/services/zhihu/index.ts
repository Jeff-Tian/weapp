import {AuthenticateService} from "../../../VSCode-Zhihu/src/service/authenticate.service";
import {ProfileService} from "../../../VSCode-Zhihu/src/service/profile.service";
import {AccountService} from "../../../VSCode-Zhihu/src/service/account.service";
import {FeedTreeViewProvider} from "../../../VSCode-Zhihu/src/treeview/feed-treeview-provider";
import {WebviewService} from "../../../VSCode-Zhihu/src/service/webview.service";
import {EventService} from "../../../VSCode-Zhihu/src/service/event.service";
import {CollectionService} from "../../../VSCode-Zhihu/src/service/collection.service";
import {CollectionTreeviewProvider} from "../../../VSCode-Zhihu/src/treeview/collection-treeview-provider";

console.log('zhihu loaded!');

export const publish = async () => {
  console.log('publishing...')

  const accountService = new AccountService();

  console.log('account service loaded');
  const profileService = new ProfileService(accountService);

  console.log('profileService loaded');
  const eventService = new EventService();

  console.log('eventService loaded')
  const feedTreeViewProvider = new FeedTreeViewProvider(accountService, profileService, eventService);

  const collectionService = new CollectionService();
  const collectionTreeViewProvider = new CollectionTreeviewProvider(profileService, collectionService)

  const webviewService = new WebviewService(collectionService, collectionTreeViewProvider);

  const authService = new AuthenticateService(profileService, accountService, feedTreeViewProvider, webviewService)

  console.log('passwordLogin...')
  await authService.passwordLogin()
}
