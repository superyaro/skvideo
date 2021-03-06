<?php
namespace Skar\Skvideo;

/**
 * Userfunc to render alternative label for media elements
 */
class ExtensionConfiguration
{
    public static function getSetting($key, $default = NULL) {

        if (class_exists('TYPO3\CMS\Core\Configuration\ExtensionConfiguration')) {
            $extensionConfiguration = \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(
                \TYPO3\CMS\Core\Configuration\ExtensionConfiguration::class
            );
            $backendConfiguration = $extensionConfiguration->get('skvideo');
        } else {
            $backendConfiguration = $GLOBALS['TYPO3_CONF_VARS']['EXT']['extConf']['skvideo'];
            if (!is_array($backendConfiguration)) {
                $backendConfiguration = unserialize($backendConfiguration);
            }
        }
        $setting = $backendConfiguration[$key]??$default;
        if ($setting) { // check here also that it is not empty
            return $setting;
        }
        return $default;

    }




}
