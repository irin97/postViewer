import { BodyLayout } from "@/widgets/BodyLayout/BodyLayout";
import { Notification } from "@/shared/ui/Notification/Notification";
import { useAppDispatch } from "./store/hooks";
import { useEffect } from "react";
import { initOperatorsSocket } from "@/shared/lib/initOperatorsSocket";

const App = () => {

  const dispatch = useAppDispatch();
  useEffect(() => {
    initOperatorsSocket(dispatch)
  }, [dispatch])

  return <>
    <Notification />
    <BodyLayout />
  </>
}

export default App