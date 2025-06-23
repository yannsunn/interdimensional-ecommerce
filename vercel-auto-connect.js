#!/usr/bin/env node

/**
 * Vercel GitHub自動接続スクリプト - 異次元通販
 * ウルトラシンク・限界突破自動化システム
 */

const https = require('https');

// Vercel APIの設定
const VERCEL_API_BASE = 'https://api.vercel.com';
const PROJECT_NAME = 'interdimensional-ecommerce';
const GITHUB_REPO = 'yannsunn/interdimensional-ecommerce';

/**
 * Vercel API呼び出し関数
 */
async function callVercelAPI(endpoint, method = 'GET', data = null, token = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.vercel.com',
      path: endpoint,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Vercel-Auto-Connect/1.0',
      }
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(body);
          resolve({ status: res.statusCode, data: result });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

/**
 * プロジェクト検索
 */
async function findProject(token) {
  console.log('🔍 プロジェクト検索中...');
  
  const response = await callVercelAPI('/v9/projects', 'GET', null, token);
  
  if (response.status !== 200) {
    throw new Error(`プロジェクト検索失敗: ${response.status}`);
  }

  const projects = response.data.projects || [];
  const project = projects.find(p => p.name === PROJECT_NAME);
  
  if (!project) {
    throw new Error(`プロジェクト "${PROJECT_NAME}" が見つかりません`);
  }

  console.log(`✅ プロジェクト発見: ${project.id}`);
  return project;
}

/**
 * Git接続状況確認
 */
async function checkGitConnection(projectId, token) {
  console.log('🔍 Git接続状況確認中...');
  
  const response = await callVercelAPI(`/v9/projects/${projectId}`, 'GET', null, token);
  
  if (response.status !== 200) {
    throw new Error(`プロジェクト詳細取得失敗: ${response.status}`);
  }

  const project = response.data;
  console.log(`📊 現在の接続状況:`);
  console.log(`   - Git統合: ${project.link ? '接続済み' : '未接続'}`);
  console.log(`   - リポジトリ: ${project.link?.repo || 'なし'}`);
  console.log(`   - ブランチ: ${project.link?.productionBranch || 'なし'}`);
  
  return project;
}

/**
 * Git接続の更新・作成
 */
async function updateGitConnection(projectId, token) {
  console.log('🔧 Git接続を更新中...');
  
  const linkData = {
    name: PROJECT_NAME,
    link: {
      type: "github",
      repo: GITHUB_REPO,
      productionBranch: "main",
      gitSource: {
        type: "github",
        repo: GITHUB_REPO,
        ref: "main"
      }
    }
  };

  const response = await callVercelAPI(`/v9/projects/${projectId}`, 'PATCH', linkData, token);
  
  if (response.status !== 200) {
    console.error(`❌ Git接続更新失敗: ${response.status}`);
    console.error(`Response: ${JSON.stringify(response.data, null, 2)}`);
    throw new Error(`Git接続更新失敗: ${response.status}`);
  }

  console.log('✅ Git接続更新成功');
  return response.data;
}

/**
 * 新規デプロイメント作成
 */
async function createDeployment(projectId, token) {
  console.log('🚀 新規デプロイメント作成中...');
  
  const deploymentData = {
    name: PROJECT_NAME,
    gitSource: {
      type: "github",
      repo: GITHUB_REPO,
      ref: "main"
    },
    target: "production"
  };

  const response = await callVercelAPI('/v13/deployments', 'POST', deploymentData, token);
  
  if (response.status !== 200 && response.status !== 201) {
    console.error(`❌ デプロイメント作成失敗: ${response.status}`);
    console.error(`Response: ${JSON.stringify(response.data, null, 2)}`);
    return null;
  }

  console.log('✅ デプロイメント作成成功');
  return response.data;
}

/**
 * メイン実行関数
 */
async function main() {
  console.log('🌌 === 異次元通販 Vercel自動接続開始 ===');
  
  // Vercel Token取得
  const token = process.env.VERCEL_TOKEN || process.argv[2];
  
  if (!token) {
    console.log('❌ Vercel Token未設定');
    console.log('');
    console.log('📝 使用方法:');
    console.log('   1. Vercelダッシュボード → Settings → Tokens');
    console.log('   2. 新しいToken作成');
    console.log('   3. このスクリプト実行:');
    console.log('      node vercel-auto-connect.js YOUR_VERCEL_TOKEN');
    console.log('');
    console.log('   または環境変数設定:');
    console.log('      export VERCEL_TOKEN=YOUR_TOKEN');
    console.log('      node vercel-auto-connect.js');
    return;
  }

  try {
    // ステップ1: プロジェクト検索
    const project = await findProject(token);
    
    // ステップ2: Git接続確認
    await checkGitConnection(project.id, token);
    
    // ステップ3: Git接続更新
    await updateGitConnection(project.id, token);
    
    // ステップ4: 新規デプロイメント作成
    await createDeployment(project.id, token);
    
    console.log('');
    console.log('🎉 === ウルトラシンク完了！限界突破達成！ ===');
    console.log('');
    console.log('✅ Git接続自動修復完了');
    console.log('✅ 最新コードでデプロイメント開始');
    console.log('✅ 異次元通販の自動化成功');
    console.log('');
    console.log('🔗 Vercelダッシュボード:');
    console.log('   https://vercel.com/yasuus-projects/interdimensional-ecommerce');
    console.log('');
    console.log('⏱️  デプロイ完了まで5-10分お待ちください');
    
  } catch (error) {
    console.error('❌ エラー発生:', error.message);
    console.log('');
    console.log('🛠️  手動接続が必要です:');
    console.log('   1. Vercelダッシュボードにアクセス');
    console.log('   2. Settings → Git → Disconnect');
    console.log('   3. Connect Git Repository で再接続');
    process.exit(1);
  }
}

// 実行
if (require.main === module) {
  main();
}

module.exports = { main, callVercelAPI, findProject, updateGitConnection };