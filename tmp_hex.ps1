$t = Get-Content -Raw script.js; [System.BitConverter]::ToString([System.Text.Encoding]::UTF8.GetBytes($t))
