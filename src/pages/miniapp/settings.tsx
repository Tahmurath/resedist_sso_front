import {ModeToggle} from "@/components/mode-toggle.tsx";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import type { Input } from "@/components/ui/input";
import UserMenu from "@/components/UserMenu.tsx";
// import {GalleryVerticalEnd} from "lucide-react";


function Index() {

    return (
        <>
        <FieldSet>
  <FieldLegend>Settings</FieldLegend>
  
  <FieldGroup>
    <Field>
      <FieldLabel htmlFor="name">Mode</FieldLabel>
      <ModeToggle />
      <FieldDescription>This appears on invoices and emails.</FieldDescription>
    </Field>
    <Field>
      <FieldLabel htmlFor="username">Language</FieldLabel>
      <UserMenu  />
    </Field>
    
  </FieldGroup>
</FieldSet>

        </>
    )
}

export default Index