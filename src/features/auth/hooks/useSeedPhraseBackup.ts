import { useRef, useCallback } from "react";
import ViewShot from "react-native-view-shot";
import Share from "react-native-share";
import { useTranslation } from "react-i18next";

export function useSeedPhraseBackup() {
  const { t } = useTranslation();
  const viewShotRef = useRef<ViewShot>(null);

  const handleBackup = useCallback(async () => {
    try {
      // 1. 获取截图
      const uri = await viewShotRef.current?.capture?.();
      if (!uri) return;

      // 2. 呼起分享面板
      const result = await Share.open({
        title: t("auth.create_account.seed.intro_title"),
        url: uri,
        type: "image/jpeg",
        failOnCancel: true,
      });

      // 3. 成功逻辑
      if (result.success) {
        console.log("Backup confirmed by user");
        //    跳转到下一步路由
      }
    } catch (error: any) {
      // 4. 捕获取消动作
      if (error?.message?.includes("User cancelled")) {
        // 取消动作之后的操作
      } else {
        console.error("Backup Error:", error);
      }
    }
  }, [t]);

  return {
    viewShotRef,
    handleBackup,
  };
}
