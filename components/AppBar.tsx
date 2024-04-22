import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { LoginDialog } from "./ui/LoginDialog";
import { useAuthStore } from "@/stores/authStore";
import { CreateUserDialog } from "./CreateUserDialog";
import { CreateMediaDialog } from "./CreateMediaDialog";

export function AppBar() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <Menubar>
      <MenubarMenu>
        {(user?.type === "ADMIN" || user?.type === "CREATOR") && (
          <CreateMediaDialog />
        )}
      </MenubarMenu>
      <MenubarMenu>{!user && <LoginDialog />}</MenubarMenu>
      <MenubarMenu>
        {(!user || user?.type === "ADMIN") && <CreateUserDialog />}
      </MenubarMenu>

      <MenubarMenu>
        {user && <Button onClick={logout}>Logout</Button>}
      </MenubarMenu>
    </Menubar>
  );
}
